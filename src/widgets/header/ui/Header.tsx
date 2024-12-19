import { AppLogo } from '@/features/navigation'
import { AppBar, LanguageSelect } from '@byte-creators/ui-kit'

export const Header = () => {
  return <AppBar content={<LanguageSelect />} logo={<AppLogo />} />
}
