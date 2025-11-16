import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, Heart, GamepadIcon, BookOpen, Users, Sparkles } from "lucide-react";
import hikingImage from "@/assets/activities-hiking.jpg";
import charityImage from "@/assets/activities-charity.jpg";

const Activities = () => {
  const activities = [
    {
      icon: Mountain,
      title: "Hikes & Adventures",
      description: "Explore Kenya's beautiful landscapes through organized hiking trips and outdoor adventures.",
      details: [
        "Monthly hiking expeditions to various locations",
        "Team building through outdoor activities",
        "Photography and nature appreciation",
        "Physical fitness and wellness",
      ],
      image: hikingImage,
    },
    {
      icon: Heart,
      title: "Charity & Community Outreach",
      description: "Give back to society through various charitable activities and community service.",
      details: [
        "Visits to children's homes and orphanages",
        "Supporting the sick and elderly",
        "Environmental conservation activities",
        "Food drives and donation campaigns",
      ],
      image: charityImage,
    },
    {
      icon: GamepadIcon,
      title: "Games & Fun Activities",
      description: "Bond with fellow members through sports, games, and social events.",
      details: [
        "Inter-constituency sports competitions",
        "Board game nights and quiz competitions",
        "Movie nights and hangouts",
        "Birthday and milestone celebrations",
      ],
    },
    {
      icon: BookOpen,
      title: "Academic Support",
      description: "Enhance academic performance through peer support and study sessions.",
      details: [
        "Study groups for different courses",
        "Exam preparation sessions",
        "Academic mentorship programs",
        "Resource sharing and collaboration",
      ],
    },
    {
      icon: Users,
      title: "Peer Support & Networking",
      description: "Build meaningful relationships and support each other's growth.",
      details: [
        "Mentorship programs for new students",
        "Career guidance and development",
        "Mental health awareness and support",
        "Professional networking opportunities",
      ],
    },
    {
      icon: Sparkles,
      title: "Cultural Events",
      description: "Celebrate and preserve our Embu County cultural heritage.",
      details: [
        "Traditional cultural performances",
        "Language and heritage promotion",
        "Annual cultural festivals",
        "Inter-cultural exchange programs",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Activities</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover the diverse range of activities that bring our community together
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 items-center max-w-6xl mx-auto`}
              >
                <div className="flex-1">
                  <Card className="h-full">
                    <CardHeader>
                      <activity.icon className="h-16 w-16 text-primary mb-4" />
                      <CardTitle className="text-3xl mb-4">{activity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg text-muted-foreground mb-6">
                        {activity.description}
                      </p>
                      <ul className="space-y-3">
                        {activity.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                {activity.image && (
                  <div className="flex-1">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Participate?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join E-MUST today and be part of these amazing activities
          </p>
          <a
            href="/register"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Register Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Activities;
