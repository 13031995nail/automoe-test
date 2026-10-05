import type { Position } from './types';

interface PositionTemplate {
  slug: string;
  names: readonly string[];
  description: string;
}

const TEMPLATES: readonly PositionTemplate[] = [
  {
    slug: 'maslo',
    names: ['Моторное масло 5W-30', 'Моторное масло 5W-40', 'Моторное масло 0W-20', 'Моторное масло 10W-40'],
    description:
      'Полностью синтетическое моторное масло премиум-класса, разработанное для максимальной защиты двигателя в любых условиях эксплуатации. Формула на основе высококачественных базовых масел и современного пакета присадок обеспечивает стабильную работу двигателя от первого запуска до последней капли',
  },
  {
    slug: 'filtr',
    names: ['Масляный фильтр', 'Воздушный фильтр', 'Салонный фильтр', 'Топливный фильтр'],
    description:
      'Фильтр с многослойным фильтрующим элементом задерживает мельчайшие частицы и продлевает срок службы узлов автомобиля.',
  },
  {
    slug: 'kolodki',
    names: ['Тормозные колодки передние', 'Тормозные колодки задние'],
    description:
      'Керамические тормозные колодки с низким уровнем шума и пыли. Стабильный коэффициент трения во всём диапазоне температур, бережное отношение к тормозным дискам.',
  },
  {
    slug: 'svechi',
    names: ['Свечи зажигания иридиевые', 'Свечи зажигания платиновые'],
    description: 'Ресурс до 100 000 км, уверенный холодный пуск.',
  },
  {
    slug: 'antifriz',
    names: ['Антифриз G12++', 'Антифриз G13', 'Тосол А-40'],
    description:
      'Готовая к применению охлаждающая жидкость на основе этиленгликоля с карбоксилатными присадками. Защищает систему охлаждения от коррозии, накипи и перегрева, совместима с большинством современных двигателей.',
  },
  {
    slug: 'shchetki',
    names: ['Щётки стеклоочистителя бескаркасные', 'Щётки стеклоочистителя гибридные'],
    description:
      'Чистое стекло без разводов в любую погоду. Графитовое покрытие резины обеспечивает тихую работу и равномерное прилегание.',
  },
  {
    slug: 'akb',
    names: ['Аккумулятор 60 А·ч', 'Аккумулятор 75 А·ч', 'Аккумулятор AGM 70 А·ч'],
    description:
      'Необслуживаемая аккумуляторная батарея с высоким пусковым током. Кальциевая технология снижает саморазряд, а усиленный корпус выдерживает вибрации и перепады температуры.',
  },
];

const BRANDS = ['Mobil', 'Castrol', 'Bosch', 'Mann', 'Brembo', 'NGK', 'Liqui Moly', 'Varta', 'Denso', 'Valeo'] as const;

/**
 * Генерация тестовых данных
 */
export function generatePositions(count: number): Position[] {
  const result: Position[] = [];
  const counters: Record<string, number> = {};

  for (let i = 0; i < count; i++) {
    const template = TEMPLATES[i % TEMPLATES.length]!;
    const name = template.names[Math.floor(i / TEMPLATES.length) % template.names.length]!;
    const brand = BRANDS[(i * 7) % BRANDS.length]!;

    const index = (counters[template.slug] ?? 0) + 1;
    counters[template.slug] = index;

    result.push({
      id: `${template.slug}-${index}`,
      name: `${name} ${brand}`,
      description: template.description,
    });
  }

  return result;
}
