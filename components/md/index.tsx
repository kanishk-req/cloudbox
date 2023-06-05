import Image from "next/image";
export const Heading = {
  H1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl pt-2 pb-6">{children}</h1>
  ),
  H2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl py-6">{children}</h2>
  ),
};

export const Text = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg">{children}</p>
);

export const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <pre className="text-lg bg-gray-300 text-white p-2 rounded-md w-auto">
    {children}
  </pre>
);

export const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="text-lg bg-gray-800 text-white p-2 rounded-md w-auto">
    {children}
  </code>
);

export const ResponsiveImage = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    src={src}
    alt={alt}
    fill
    className="w-full h-auto object-cover rounded-md"
  />
);

export const components = {
  img: ResponsiveImage,
  h1: Heading.H1,
  h2: Heading.H2,
  p: Text,
  code: Code,
  inlineCode: InlineCode,
};
