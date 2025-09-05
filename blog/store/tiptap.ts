import { create } from "zustand"
import { createComputed } from "zustand-computed"
interface ThemeToggleStore {
  isDark: boolean,
  setDarkMode: (isDark: boolean) => void
}
const computed = createComputed((state: ThemeToggleStore) => {
    return {
        isDark: state.isDark,
    }
})

export const useTipStore = create<ThemeToggleStore>()(
    computed(
        (set) => ({
            isDark: false,
            setDarkMode: (isDark) => set(() => ({
                isDark
            }))
        })
    )
)