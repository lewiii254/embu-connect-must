import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const contacts = [
    {
      icon: Phone,
      title: "Phone",
      details: ["0799 522 014 (Harriet Njagi)", "0758 260 324"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["emust@example.com"],
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["Join our community group"],
      link: "https://wa.me/254799522014",
    },
  ];

  const socials = [
    { icon: Facebook, name: "Facebook", link: "#", color: "text-blue-600" },
    { icon: Instagram, name: "Instagram", link: "#", color: "text-pink-600" },
    { icon: Twitter, name: "Twitter", link: "#", color: "text-sky-500" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Get in touch with E-MUST
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contacts.map((contact, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <contact.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>{contact.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {contact.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground mb-2">
                        {detail}
                      </p>
                    ))}
                    {contact.link && (
                      <a href={contact.link} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="mt-4">
                          Connect
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Media */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Follow Us on Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-8">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                      <social.icon className={`h-10 w-10 ${social.color}`} />
                      <span className="text-sm text-muted-foreground">{social.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Visit Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find us at Meru University of Science and Technology. We welcome all Embu County
            students to join our vibrant community.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
