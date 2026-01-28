export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export type Link = {
  label: string;
  link: string;
};

export type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
};
