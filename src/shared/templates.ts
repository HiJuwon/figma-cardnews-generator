/**
 * templates.ts
 * - 카드뉴스 템플릿 유형 목록 파일
 * - 유형별 입력 필드 + 적용 가능한 옵션 (color theme, image mode) 정의
 */


/** 공통 상수 */

// 인스타그램 피드 3:4
export const CARD_SIZE = { width: 1080, height: 1440 } as const;

// 카드뉴스 내 이미지 출처 표기
export const IMG_SOURCE_PREFIX = '출처 | ';
export const IMG_SOURCE_DEFAULT = 'Pinterest';


/** 옵션 */

// 컬러 테마: 겉표지와 엔딩페이지에서 사용
export const COLOR_THEMES = ['mint', 'lime'] as const;
export type ColorTheme = (typeof COLOR_THEMES)[number];

export const COLOR_THEME_LABELS: Record<ColorTheme, string> = {
  mint: 'Mint',
  lime: 'Lime',
};

// 이미지 모드: 본문 페이지 내 -> 배경으로 꽉채우기 OR 본문 안에 프레임으로 넣기
export const IMAGE_MODES = ['background', 'inline'] as const;
export type ImageMode = (typeof IMAGE_MODES)[number];

export const IMAGE_MODE_LABELS: Record<ImageMode, string> = {
  background: '배경 이미지',
  inline: '본문 이미지',
};

export type TemplateOptionsState = {
  colorTheme: ColorTheme;
  imageMode: ImageMode;
};

export const DEFAULT_OPTIONS: TemplateOptionsState = {
  colorTheme: 'mint',
  imageMode: 'background',
};


/** 입력 필드 */

/**
 * 필드 key는 UI 필드 컴포넌트와 1:1로 대응한다
 * - category       → ThumbnailCategoryTextField
 * - thumbnailTitle → ThumbnailTitleTextField
 * - title          → TitleTextField
 * - caption        → CaptionTextAreaField
 * - image          → ImageField
 * - imgSource     → ImgSourceTextField (한 줄 입력)
 */
export type FieldKey =
  | 'category'
  | 'thumbnailTitle'
  | 'title'
  | 'caption'
  | 'image'
  | 'imgSource';

export type FieldDef = {
  key: FieldKey;
  label: string;
  placeholder?: string;
  required: boolean;      // 필수 입력 여부
  defaultValue?: string;  // 입력하지 않았을 때 plugin이 대신 사용하는 값
};

// 필드별 공통 정의
const FIELD_BASE: Record<FieldKey, Omit<FieldDef, 'key' | 'required'>> = {
  category:       { label: '카테고리 태그', placeholder: 'ROUTE, RECORD, GUIDE 등, 카드뉴스 카테고리를 정하여 입력' },
  thumbnailTitle: { label: '표지 제목', placeholder: '표지 제목 입력...' },
  title:          { label: '타이틀', placeholder: '페이지 내 소제목 입력...' },
  caption:        { label: '캡션', placeholder: '페이지 내 본문 입력...' },
  image:          { label: '이미지' },
  imgSource:   {
    label: '이미지 출처',
    placeholder: IMG_SOURCE_DEFAULT,      // 입력창에 흐리게 기본값 안내
    defaultValue: IMG_SOURCE_DEFAULT,
  },
};

const field = (key: FieldKey, required: boolean): FieldDef => ({
  key,
  required,
  ...FIELD_BASE[key],
});

// 이미지(image)와 이미지출처(imgSource)는 항상 같이 있어야 함: 두 필드를 묶어서 반환
const imageWithSource = (): FieldDef[] => [
  field('image', false),
  field('imgSource', false),
];


/** 템플릿 정의 */

export const TEMPLATE_IDS = [
  'thumbnail',
  'body-caption',
  'body-bottom-title',
  'body-top-title',
  'ending',
] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export type TemplateDef = {
  id: TemplateId;

  // TemplateSelector에 표시할 이름
  name: string;

  // CardForm이 순서대로 렌더링할 입력 필드
  fields: FieldDef[];

  // 이 유형에서 보여 줄 옵션 선택 UI
  options: {
    colorTheme: boolean; // ColorThemeSelector 표시 여부
    imageMode: boolean;  // ImageModeSelector 표시 여부
  };
};

export const TEMPLATES = {
  thumbnail: {
    id: 'thumbnail',
    name: '1 겉표지(썸네일)',
    fields: [
      field('category', true),
      field('thumbnailTitle', true),
      ...imageWithSource(),
    ],
    options: { colorTheme: true, imageMode: false },
  },
  'body-caption': {
    id: 'body-caption',
    name: '2 하단 캡션',
    fields: [field('caption', true), ...imageWithSource()],
    options: { colorTheme: false, imageMode: false },
  },
  'body-bottom-title': {
    id: 'body-bottom-title',
    name: '3 하단 타이틀 + 캡션',
    fields: [field('title', true), field('caption', true), ...imageWithSource()],
    options: { colorTheme: false, imageMode: true },
  },
  'body-top-title': {
    id: 'body-top-title',
    name: '4 상단 타이틀 + 하단 캡션',
    fields: [field('title', true), field('caption', true), ...imageWithSource()],
    options: { colorTheme: false, imageMode: true },
  },
  ending: {
    id: 'ending',
    name: '5 엔딩',
    fields: [],
    options: { colorTheme: true, imageMode: false },
  },
} as const satisfies Record<TemplateId, TemplateDef>;