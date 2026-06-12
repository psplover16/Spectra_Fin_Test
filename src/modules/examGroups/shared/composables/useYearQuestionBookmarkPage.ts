import { computed, nextTick, ref, type ComputedRef } from 'vue';
import {
  clearYearQuestionBookmark,
  createYearQuestionElementId,
  readYearQuestionBookmark,
  setYearQuestionBookmark,
  type YearQuestionBookmarkGroup
} from '@/modules/examGroups/shared/storage/yearQuestionBookmarkStorage';

export function useYearQuestionBookmarkPage(
  group: YearQuestionBookmarkGroup,
  year: ComputedRef<string | undefined>
) {
  const bookmarkedQuestionNumber = ref<number | null>(null);
  const currentYear = computed(() => year.value);

  function questionElementId(questionNumber: number): string {
    return currentYear.value ? createYearQuestionElementId(group, currentYear.value, questionNumber) : '';
  }

  function refreshBookmarkedQuestion(): void {
    if (!currentYear.value) {
      bookmarkedQuestionNumber.value = null;
      return;
    }

    bookmarkedQuestionNumber.value = readYearQuestionBookmark(group, currentYear.value)?.questionNumber ?? null;
  }

  function toggleQuestionBookmark(questionNumber: number): void {
    if (!currentYear.value) {
      return;
    }

    if (bookmarkedQuestionNumber.value === questionNumber) {
      clearYearQuestionBookmark(group, currentYear.value);
      bookmarkedQuestionNumber.value = null;
      return;
    }

    setYearQuestionBookmark(group, currentYear.value, questionNumber);
    bookmarkedQuestionNumber.value = questionNumber;
  }

  async function scrollToBookmarkedQuestion(): Promise<void> {
    await nextTick();

    if (!currentYear.value || bookmarkedQuestionNumber.value === null) {
      return;
    }

    document.getElementById(questionElementId(bookmarkedQuestionNumber.value))?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  return {
    bookmarkedQuestionNumber,
    questionElementId,
    refreshBookmarkedQuestion,
    scrollToBookmarkedQuestion,
    toggleQuestionBookmark
  };
}
