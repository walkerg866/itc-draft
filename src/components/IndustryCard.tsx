import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface IndustryCardProps {
  title: string;
  description: string;
  image: string;
  delay?: number;
}

const IndustryCard = ({ title, description, image }: IndustryCardProps) => {
  return (
    <Link
      to="/industries"
      className="group relative overflow-hidden rounded-lg shadow-industrial hover:shadow-xl transition-all duration-500"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-heading font-bold text-lg text-secondary-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-steel-muted text-sm leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          Learn More <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
};

export default IndustryCard;
