import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email").max(255),
  phone: z.string().min(10, "Please enter a valid phone number").max(20),
  eventType: z.string().min(1, "Please select an event type"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type FormData = z.infer<typeof formSchema>;

const eventTypes = [
  "Corporate Event",
  "Wedding",
  "Concert",
  "Festival",
  "Private Party",
  "Conference",
  "Product Launch",
  "Other",
];


const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", data);
    toast.success("Thank you! We'll be in touch within 24 hours.", {
      icon: <CheckCircle className="w-5 h-5 text-gold" />,
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden scroll-mt-28 md:scroll-mt-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal/30 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-sm font-semibold tracking-wider uppercase mb-4 block">
              Let’s build your next drop
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Tell us about the <span className="text-gradient-gold">experience</span> you need.
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-md">
              Give us the headline, the audience, and the date. We’ll map the story, crew, and tech to deliver it without static.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  label: "HQ",
                  value: "MESKEL FLOWER BEHIND DREAMLINER HOTEL JEMA BUILDING 6TH FLOOR",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+251942888555\n+251911605758\n+251911345531",
                },
                { icon: Mail, label: "Email", value: "info@magnapromotion.com" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-medium whitespace-pre-line">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
                className="glass-strong rounded-3xl p-8 md:p-10 space-y-6 border border-[hsl(var(--gold)_/_0.2)]"
            >
              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    {...register("name")}
                    className="bg-charcoal border-border focus:border-gold h-12"
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    {...register("email")}
                    className="bg-charcoal border-border focus:border-gold h-12"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Phone & Event Type */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Phone Number"
                    {...register("phone")}
                    className="bg-charcoal border-border focus:border-gold h-12"
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <Select onValueChange={(value) => setValue("eventType", value)}>
                    <SelectTrigger className="bg-charcoal border-border focus:border-gold h-12">
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-charcoal border-border">
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.eventType && (
                    <p className="text-destructive text-sm mt-1">{errors.eventType.message}</p>
                  )}
                </div>
              </div>


              {/* Message */}
              <div>
                <Textarea
                  placeholder="Tell us about your event..."
                  rows={5}
                  {...register("message")}
                  className="bg-charcoal border-border focus:border-gold resize-none"
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="gold"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    />
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Request
                    <Send className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
