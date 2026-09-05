/**
 * LocalStorage utility for persisting client proposal selections & quantities
 * Allows clients and administrators to resume their proposal seamlessly across page refreshes.
 */

const STORAGE_KEY = 'o2graphic_proposal_selection_state';

export interface SavedSelectionState {
  selectedIds: string[];
  quantities: { [id: string]: number };
  appliedCoupon?: { code: string; discount: number } | null;
  savedAt: number;
}

/**
 * Retrieves the saved proposal selection state from localStorage if valid
 */
export function getSavedSelectionState(): SavedSelectionState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.selectedIds)) {
      return {
        selectedIds: parsed.selectedIds,
        quantities: parsed.quantities && typeof parsed.quantities === 'object' ? parsed.quantities : {},
        appliedCoupon: parsed.appliedCoupon || null,
        savedAt: typeof parsed.savedAt === 'number' ? parsed.savedAt : Date.now(),
      };
    }
    return null;
  } catch (e) {
    console.warn('Failed to parse saved proposal selection:', e);
    return null;
  }
}

/**
 * Saves current selection state to localStorage
 */
export function saveSelectionState(
  selectedIds: string[],
  quantities: { [id: string]: number },
  appliedCoupon?: { code: string; discount: number } | null
): void {
  if (typeof window === 'undefined') return;
  try {
    const state: SavedSelectionState = {
      selectedIds,
      quantities,
      appliedCoupon: appliedCoupon || null,
      savedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save proposal selection to localStorage:', e);
  }
}

/**
 * Clears saved proposal selection from localStorage
 */
export function clearSavedSelectionState(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear proposal selection:', e);
  }
}
