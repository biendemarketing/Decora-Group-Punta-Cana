import { 
    Calculator, Eye, Wrench, Users, Phone,
    Truck, CreditCard, ShieldCheck, Package, Gem, Lightbulb, Award, Heart, CheckCircle,
    FileText, Edit3, BookOpen
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Calculator,
  Eye,
  Wrench,
  Users,
  Phone,
  Truck,
  CreditCard,
  ShieldCheck,
  Package,
  Gem,
  Lightbulb,
  Award,
  Heart,
  CheckCircle,
  FileText,
  Edit3,
  BookOpen,
  Default: () => null,
};

export default iconMap;
