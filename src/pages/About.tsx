import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Eye, Heart } from "lucide-react";

const About = () => {
  const leadership = [
    { position: "Chairman", name: "To be announced" },
    { position: "Vice Chairman", name: "To be announced" },
    { position: "Secretary", name: "To be announced" },
    { position: "Treasurer", name: "To be announced" },
    { position: "Programs Representative", name: "To be announced" },
  ];

  const values = [
    {
      icon: Users,
      title: "Unity",
      description: "We believe in the strength of togetherness and community support.",
    },
    {
      icon: Heart,
      title: "Care",
      description: "We look out for each other's wellbeing and success.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for academic and personal excellence in all we do.",
    },
    {
      icon: Eye,
      title: "Vision",
      description: "We envision a future where every member thrives and succeeds.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About E-MUST</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Building a strong, supportive community for Embu County students at MUST
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Who We Are</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                E-MUST (Embu County Students Association) is a vibrant community of students from Embu
                County studying at Meru University of Science and Technology. We are united by our
                shared roots, cultural heritage, and commitment to supporting each other's academic
                and personal growth.
              </p>
              <p className="mb-6">
                Founded with the vision of creating a home away from home, E-MUST provides a platform
                for students to connect, collaborate, and create lasting friendships. We organize
                various activities ranging from academic support sessions to social events, charity
                initiatives, and cultural celebrations.
              </p>
              <p>
                Our community is built on the principles of unity, mutual support, and excellence.
                Whether you're a first-year student or in your final year, E-MUST welcomes you to
                be part of this amazing family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-t-4 border-t-primary">
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To create a supportive and inclusive community that empowers Embu County students
                  at MUST to excel academically, grow personally, and contribute positively to
                  society through unity, collaboration, and shared cultural values.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-secondary">
              <CardHeader>
                <Eye className="h-12 w-12 text-secondary mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the leading student community organization that nurtures future leaders,
                  promotes academic excellence, and strengthens the bonds among Embu County students
                  at Meru University and beyond.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Leadership</h2>
            <p className="text-lg text-muted-foreground">
              Meet the team leading E-MUST
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {leadership.map((leader, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-center">{leader.position}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{leader.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
