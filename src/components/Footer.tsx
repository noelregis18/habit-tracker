
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="mt-auto py-8 border-t bg-muted/40">
      <div className="container">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-xl font-semibold">Connect with Me</div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              asChild
              className="rounded-full"
            >
              <a 
                href="https://www.linkedin.com/in/noel-regis-aa07081b1/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              asChild
              className="rounded-full"
            >
              <a 
                href="https://github.com/noelregis18" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              asChild
              className="rounded-full"
            >
              <a 
                href="https://x.com/NoelRegis8" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                title="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              asChild
              className="rounded-full"
            >
              <a 
                href="mailto:noel.regis04@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Email"
                title="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              asChild
              className="rounded-full"
            >
              <a 
                href="tel:+917319546900" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Phone"
                title="Phone"
              >
                <Phone className="h-5 w-5" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              asChild
              className="rounded-full"
            >
              <a 
                href="http://topmate.io/noel_regis" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Topmate"
                title="Topmate"
              >
                <Globe className="h-5 w-5" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              asChild
              className="rounded-full"
            >
              <a 
                href="https://www.google.com/maps/place/Asansol,+West+Bengal,+India" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Location: Asansol, West Bengal, India"
                title="Location: Asansol, West Bengal, India"
              >
                <MapPin className="h-5 w-5" />
              </a>
            </Button>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a 
              href="mailto:noel.regis04@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              noel.regis04@gmail.com
            </a>
            <a 
              href="tel:+917319546900" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              +91 7319546900
            </a>
            <a 
              href="https://www.google.com/maps/place/Asansol,+West+Bengal,+India" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Asansol, West Bengal, India
            </a>
          </div>
          
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Growth Habit Hub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
