import SVG from 'react-inlinesvg'
import { RadioGroupCard, RadioGroupCardItem } from 'ui'

export default function RadioGroupDemo() {
  const singleThemes = [
    { name: 'Dark', value: 'dark' }, // Classic Savira dark
    { name: 'Classic dark', value: 'classic-dark' }, // Deep Dark Savira dark
    { name: 'Light', value: 'light' }, // Classic Savira light
    { name: 'System', value: 'system' }, // Classic Savira light
  ] as const

  return (
    <RadioGroupCard defaultValue="comfortable" className="flex flex-wrap gap-3">
      {singleThemes.map((theme) => (
        <RadioGroupCardItem key={theme.value} value={theme.value} label={theme.name}>
          <SVG src={`${process.env.NEXT_PUBLIC_BASE_PATH}/img/themes/${theme.value}.svg`} />
        </RadioGroupCardItem>
      ))}
    </RadioGroupCard>
  )
}
