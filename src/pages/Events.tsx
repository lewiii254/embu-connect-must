import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";

const Events = () => {
  const { data: upcomingEvents, isLoading: upcomingLoading } = useQuery({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", new Date().toISOString())
        .order("event_date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const { data: pastEvents, isLoading: pastLoading } = useQuery({
    queryKey: ["past-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .lt("event_date", new Date().toISOString())
        .order("event_date", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

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
          <Calendar className="h-4 w-4 text-primary" />
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
          <Calendar className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">Events</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Stay updated with all our upcoming and past events
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Upcoming Events</h2>
          {upcomingLoading ? (
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
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No upcoming events at the moment. Check back soon!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents && pastEvents.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Past Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Events;
