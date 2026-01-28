import { classNames } from "../utils";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";

type MenuItem = {
  label: string;
  link: string;
};

type NavbarProps = {
  current: string;
};

const menuItems: MenuItem[] = [
  { label: "Home", link: "/" },
  { label: "Chi sono", link: "/chi-sono" },
  { label: "Servizi", link: "/servizi" },
  { label: "Manutenzione", link: "/normative-manutenzione-fgas-siert" },
  { label: "Centro Kronotherm", link: "/centro-assistenza-ricambi-kronotherm" },
];

const contactButton: MenuItem = {
  label: "Contatti",
  link: "/contatti",
};

const companyData = {
  name: "DPM Impianti",
  logoSrc: "/logo-dpm.png",
};

export function Header({ current }: NavbarProps) {
  return (
    <Disclosure as="nav" className="relative bg-white shadow-sm z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="mr-2 -ml-2 flex items-center md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-sky-600 focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Apri menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-open:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-open:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex shrink-0 items-center">
              <img
                alt={companyData.name}
                src={companyData.logoSrc}
                className="h-6 w-auto"
              />
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  className={classNames(
                    current === item.link
                      ? "inline-flex items-center border-b-2 border-sky-600 px-1 pt-1 text-sm font-medium text-gray-900"
                      : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  )}
                >
                  {item.label}
                </a>
              ))}
              {/* Current: "border-sky-600 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
            </div>
          </div>
          <div className="flex items-center">
            <div className="shrink-0">
              <a
                href={contactButton.link}
                className="relative inline-flex items-center gap-x-1.5 rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                <PlusIcon aria-hidden="true" className="-ml-0.5 size-5" />
                {contactButton.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 pt-2 pb-3">
          {/* Current: "bg-sky-50 border-sky-600 text-sky-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}

          {menuItems.map((item) => (
            <DisclosureButton
              as="a"
              href={item.link}
              className={classNames(
                current === item.link
                  ? "block border-l-4 border-sky-600 bg-sky-50 py-2 pr-4 pl-3 text-base font-medium text-sky-700 sm:pr-6 sm:pl-5"
                  : "block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 sm:pr-6 sm:pl-5",
              )}
            >
              {item.label}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
