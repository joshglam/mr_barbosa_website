import { CaseyProvider } from '@/components/casey';
import { CaseyClientLoader } from '@/components/casey/CaseyClientLoader';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CaseyProvider>
      {children}
      <CaseyClientLoader />
    </CaseyProvider>
  );
}
