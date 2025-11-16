import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Heart, BookOpen, Trophy, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  // Fetch upcoming events
  const { data: events } = useQuery({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("event_date", new Date().toISOString())
        .order("event_date", { ascending: true })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  const activities = [
    {
      icon: Trophy,
      title: "Hikes & Adventures",
      description: "Explore nature together through organized hikes and outdoor activities.",
    },
    {
      icon: Heart,
      title: "Charity & Outreach",
      description: "Visit children's homes and support community welfare initiatives.",
    },
    {
      icon: Users,
      title: "Social Events",
      description: "Build lasting friendships through games, celebrations, and gatherings.",
    },
    {
      icon: BookOpen,
      title: "Academic Support",
      description: "Study groups, mentorship, and peer-to-peer learning sessions.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/80"></div>
        <div className="relative z-10 text-center text-primary-foreground px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            E-MUST
          </h1>
          <p className="text-xl md:text-3xl mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Embu County Students Association
          </p>
          <p className="text-lg md:text-xl mb-8 opacity-90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            Meru University of Science and Technology
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="font-semibold">
                Register Now
              </Button>
            </Link>
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground">
                View Gallery
              </Button>
            </Link>
            <a href="https://wa.me/254799522014" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Join WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6 text-foreground">Who We Are</h2>
            <p className="text-lg text-muted-foreground mb-8">
              E-MUST is a vibrant community of students from Embu County studying at Meru University
              of Science and Technology. We are united by our shared roots and commitment to
              supporting each other academically, socially, and professionally.
            </p>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Activities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We organize diverse activities that bring our community together
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <activity.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/activities">
              <Button size="lg">
                Explore All Activities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-foreground">Upcoming Events</h2>
            <p className="text-lg text-muted-foreground">
              Don't miss out on our exciting upcoming events
            </p>
          </div>
          {events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {event.poster_url && (
                    <img
                      src={event.poster_url}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">{event.description}</p>
                    <p className="text-sm font-medium">
                      📍 {event.venue}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      📅 {new Date(event.event_date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
              </CardContent>
            </Card>
          )}
          <div className="text-center mt-8">
            <Link to="/events">
              <Button size="lg" variant="outline">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Become part of E-MUST today and connect with fellow Embu students at MUST
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              Register Now - It's Free!
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
