import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, MapPin, Clock, LayoutGrid, CalendarDays } from "lucide-react";
import { format, isSameDay, startOfMonth, endOfMonth } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [viewMonth, setViewMonth] = useState<Date>(new Date());

  const { data: allEvents, isLoading } = useQuery({
    queryKey: ["all-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Get events for the selected date or upcoming events
  const filteredEvents = selectedDate && allEvents
    ? allEvents.filter(event => isSameDay(new Date(event.event_date), selectedDate))
    : allEvents?.filter(event => new Date(event.event_date) >= new Date());

  // Get events for the current month view
  const monthEvents = allEvents?.filter(event => {
    const eventDate = new Date(event.event_date);
    return eventDate >= startOfMonth(viewMonth) && eventDate <= endOfMonth(viewMonth);
  });

  // Get dates that have events for the calendar
  const eventDates = allEvents?.map(event => new Date(event.event_date)) || [];

  const upcomingEvents = allEvents?.filter(event => new Date(event.event_date) >= new Date());
  const pastEvents = allEvents?.filter(event => new Date(event.event_date) < new Date()).slice(0, 6);

  const EventCard = ({ event }: { event: any }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {event.poster_url && (
        <img
          src={event.poster_url}
          alt={event.title}
          className="w-full h-56 object-cover"
        />
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {event.description && (
          <p className="text-muted-foreground">{event.description}</p>
        )}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-medium">{event.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CalendarIcon className="h-4 w-4 text-primary" />
          <span>{format(new Date(event.event_date), "EEEE, MMMM d, yyyy")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span>{format(new Date(event.event_date), "h:mm a")}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <CalendarIcon className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Events</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Stay updated with all our upcoming and past events
          </p>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                List View
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Calendar View
              </TabsTrigger>
            </TabsList>

            {/* List View */}
            <TabsContent value="list" className="space-y-20">
              {/* Upcoming Events */}
              <div>
                <h2 className="text-4xl font-bold mb-12 text-center">Upcoming Events</h2>
                {isLoading ? (
                  <div className="text-center text-muted-foreground">Loading events...</div>
                ) : upcomingEvents && upcomingEvents.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <Card className="max-w-md mx-auto">
                    <CardContent className="pt-6 text-center">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No upcoming events at the moment. Check back soon!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Past Events */}
              {pastEvents && pastEvents.length > 0 && (
                <div className="bg-muted/30 -mx-4 px-4 py-20">
                  <h2 className="text-4xl font-bold mb-12 text-center">Past Events</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Calendar View */}
            <TabsContent value="calendar">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-[400px_1fr] gap-8">
                  {/* Calendar */}
                  <Card className="p-6 h-fit">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Select Date</h3>
                        {selectedDate && (
                          <Badge 
                            variant="secondary" 
                            className="cursor-pointer hover:bg-secondary/80"
                            onClick={() => setSelectedDate(undefined)}
                          >
                            Clear
                          </Badge>
                        )}
                      </div>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        month={viewMonth}
                        onMonthChange={setViewMonth}
                        className="rounded-md border pointer-events-auto"
                        modifiers={{
                          hasEvent: eventDates,
                        }}
                        modifiersStyles={{
                          hasEvent: {
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                          },
                        }}
                      />
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground mb-2">
                          {monthEvents?.length || 0} event(s) this month
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Dates with events are underlined
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Events for selected date or upcoming */}
                  <div>
                    <h2 className="text-3xl font-bold mb-6">
                      {selectedDate 
                        ? `Events on ${format(selectedDate, "MMMM d, yyyy")}`
                        : "Upcoming Events"
                      }
                    </h2>
                    {isLoading ? (
                      <div className="text-center text-muted-foreground py-12">
                        Loading events...
                      </div>
                    ) : filteredEvents && filteredEvents.length > 0 ? (
                      <div className="grid gap-6">
                        {filteredEvents.map((event) => (
                          <EventCard key={event.id} event={event} />
                        ))}
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">
                            {selectedDate 
                              ? "No events scheduled for this date"
                              : "No upcoming events at the moment"
                            }
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Events;
