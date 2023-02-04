import { APP_BASE_TITLE } from "@/config/meta";

export function createPageTitle(additionalTitle?: string) {
  return additionalTitle
    ? `${APP_BASE_TITLE} - ${additionalTitle}`
    : `${APP_BASE_TITLE}`;
}
