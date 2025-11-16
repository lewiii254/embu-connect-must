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
        className="relative h-[700px] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary/80 animate-in fade-in duration-1000"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 text-center text-primary-foreground px-4 max-w-5xl">
          <div className="mb-8 animate-in fade-in slide-in-from-top-8 duration-1000">
            <div className="inline-block p-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20 mb-6">
              <Sparkles className="h-16 w-16 text-accent animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-accent drop-shadow-lg">
              E-MUST
            </span>
          </h1>
          
          <p className="text-2xl md:text-4xl mb-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 font-semibold">
            Embu County Students Association
          </p>
          
          <p className="text-lg md:text-2xl mb-10 opacity-95 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 font-medium">
            Meru University of Science and Technology
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="font-semibold text-lg px-8 py-6 hover-scale shadow-lg hover:shadow-xl transition-all">
                Register Now
              </Button>
            </Link>
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-2 border-primary-foreground font-semibold text-lg px-8 py-6 backdrop-blur-sm hover-scale shadow-lg hover:shadow-xl transition-all">
                View Gallery
              </Button>
            </Link>
            <a href="https://wa.me/254799522014" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8 py-6 hover-scale shadow-lg hover:shadow-xl transition-all">
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
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-in fade-in duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Our Activities</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We organize diverse activities that bring our community together
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                    <activity.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12 animate-in fade-in duration-700 delay-500">
            <Link to="/activities">
              <Button size="lg" className="hover-scale shadow-lg hover:shadow-xl">
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
      <section className="py-24 bg-gradient-to-r from-primary via-primary to-secondary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Heart className="h-16 w-16 mx-auto mb-6 text-accent animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">Ready to Join Our Community?</h2>
            <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-2xl mx-auto font-medium">
              Become part of E-MUST today and connect with fellow Embu students at MUST
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-10 py-6 hover-scale shadow-2xl hover:shadow-accent/50 transition-all">
                Register Now - It's Free!
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
