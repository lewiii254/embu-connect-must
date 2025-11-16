import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, CheckCircle } from "lucide-react";

const formSchema = z.object({
  full_name: z.string().min(3, "Name must be at least 3 characters").max(100),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  email: z.string().email("Invalid email address").max(255),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  county: z.string().default("Embu"),
  constituency: z.string().min(2, "Please enter your constituency").max(100),
  ward: z.string().max(100).optional(),
  school: z.enum(["SCI", "SEAC", "SPA", "SBE", "Nursing", "Engineering"]),
  year_of_study: z.enum(["1", "2", "3", "4", "5", "6"]),
  skills: z.string().max(500).optional(),
  why_join: z.string().max(1000).optional(),
});

type FormData = z.infer<typeof formSchema>;

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      county: "Embu",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const memberData = {
        full_name: data.full_name,
        gender: data.gender || null,
        email: data.email,
        phone_number: data.phone_number,
        county: data.county || "Embu",
        constituency: data.constituency,
        ward: data.ward || null,
        school: data.school,
        year_of_study: data.year_of_study,
        skills: data.skills || null,
        why_join: data.why_join || null,
      };
      const { error } = await supabase.from("members").insert([memberData]);

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          toast({
            title: "Email Already Registered",
            description: "This email is already registered. Please use a different email.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        setIsSubmitted(true);
        toast({
          title: "Registration Successful!",
          description: "Welcome to E-MUST! We'll be in touch soon.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl">Welcome to E-MUST!</CardTitle>
            <CardDescription className="text-lg">
              Your registration was successful. We're excited to have you in our community!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-center">
              Check your email for more information about upcoming events and activities.
            </p>
            <div className="flex gap-4">
              <a href="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </a>
              <a href="https://wa.me/254799522014" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full">
                  Join WhatsApp
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <UserPlus className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl">Join E-MUST</CardTitle>
            <CardDescription>
              Fill out the form below to become a member of our community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  {...register("full_name")}
                  placeholder="John Doe"
                />
                {errors.full_name && (
                  <p className="text-sm text-destructive">{errors.full_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender (Optional)</Label>
                <Select onValueChange={(value) => setValue("gender", value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number *</Label>
                  <Input
                    id="phone_number"
                    {...register("phone_number")}
                    placeholder="0712345678"
                  />
                  {errors.phone_number && (
                    <p className="text-sm text-destructive">{errors.phone_number.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="constituency">Constituency *</Label>
                <Input
                  id="constituency"
                  {...register("constituency")}
                  placeholder="e.g., Runyenjes"
                />
                {errors.constituency && (
                  <p className="text-sm text-destructive">{errors.constituency.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ward">Ward (Optional)</Label>
                <Input
                  id="ward"
                  {...register("ward")}
                  placeholder="e.g., Kyeni South"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="school">School *</Label>
                  <Select onValueChange={(value) => setValue("school", value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select school" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SCI">SCI</SelectItem>
                      <SelectItem value="SEAC">SEAC</SelectItem>
                      <SelectItem value="SPA">SPA</SelectItem>
                      <SelectItem value="SBE">SBE</SelectItem>
                      <SelectItem value="Nursing">Nursing</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.school && (
                    <p className="text-sm text-destructive">{errors.school.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year_of_study">Year of Study *</Label>
                  <Select onValueChange={(value) => setValue("year_of_study", value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Year 1</SelectItem>
                      <SelectItem value="2">Year 2</SelectItem>
                      <SelectItem value="3">Year 3</SelectItem>
                      <SelectItem value="4">Year 4</SelectItem>
                      <SelectItem value="5">Year 5</SelectItem>
                      <SelectItem value="6">Year 6</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.year_of_study && (
                    <p className="text-sm text-destructive">{errors.year_of_study.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills (Optional)</Label>
                <Textarea
                  id="skills"
                  {...register("skills")}
                  placeholder="e.g., Photography, Writing, Event Planning"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="why_join">Why do you want to join E-MUST? (Optional)</Label>
                <Textarea
                  id="why_join"
                  {...register("why_join")}
                  placeholder="Tell us what motivates you to join our community"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Register Now"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
