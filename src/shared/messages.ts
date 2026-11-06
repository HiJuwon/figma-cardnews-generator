/**
 * messages.ts
 * - postMessage로 전달되는 메시지 유형 정의
 * - UI -> plugin: 카드뉴스 생성 요청, 플러그인 닫기
 * - plugin -> UI: 카드뉴스 생성 결과 전송 (성공 / 실패)
 * - plugin 빌드에도 포함되므로 DOM 관련 타입은 포함하지 않음
 */

import type { FieldKey, TemplateId, TemplateOptionsState } from './templates';


/** 카드뉴스 데이터 */

// 텍스트로 입력받는 필드 key (이미지 제외한 전부)
export type TextFieldKey = Exclude<FieldKey, 'image'>;

// 카드뉴스 한 장 생성 시 필요한 데이터 구조
export type CardnewsData = {
  /**
   * 텍스트 입력값
   * - 유형마다 쓰는 필드가 달라서 모든 key가 선택값(Partial)
   * - 필수 입력 검사는 UI에서 TEMPLATES[id].fields의 required로 처리
   */
  texts: Partial<Record<TextFieldKey, string>>;

  // 이미지 바이트 (선택 입력, 카드당 최대 1장)
  // 나중에 이미지 여러장 있는 템플릿 구현하게 되면 여기서 image를 배열로 바꾸고, UI에서 이미지 업로드 컴포넌트도 여러장 업로드 가능하게 바꿔야 함
  image?: Uint8Array;

  // 컬러 테마, 이미지 모드 (해당 템플릿 유형에서 쓰지 않는 옵션은 builder가 무시)
  options: TemplateOptionsState;
};


/** UI -> plugin 메시지 */

export type UIToPluginMessage =
  | {
      type: 'create-card';
      templateId: TemplateId;
      data: CardnewsData;
    }
  | {
      type: 'close';
    };

/** plugin -> UI 메시지 */

export type PluginToUIMessage =
  | {
      type: 'card-created';
      templateId: TemplateId;
    }
  | {
      type: 'card-error';
      message: string;
    };