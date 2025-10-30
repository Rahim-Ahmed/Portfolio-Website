import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { config } from "@/config/site-config";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Get in Touch
        </h2>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-muted-foreground mb-8">
            Feel free to reach out for collaborations, opportunities, or just a friendly chat!
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <Mail className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Email</h3>
                  <a
                    href={`mailto:${config.personal.email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    {config.personal.email}
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <Phone className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Phone</h3>
                  <a
                    href={`tel:${config.personal.phone}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {config.personal.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <MapPin className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    {config.personal.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
