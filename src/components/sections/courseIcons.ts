import { Compass, GraduationCap, Sprout, type LucideIcon } from 'lucide-react';
import type { CourseIcon } from '../../config/courses';

export const courseIcons: Record<CourseIcon, LucideIcon> = {
  sprout: Sprout,
  compass: Compass,
  graduation: GraduationCap,
};
