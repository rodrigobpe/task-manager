export const useTheme = () => {
    const colorMode = useColorMode()
    const iconTheme = computed(() => (colorMode.preference === 'dark' ? 'radix-icons:sun' : 'radix-icons:moon'))
    const changeTheme = () => (colorMode.preference === 'dark' ? colorMode.preference = 'light' : colorMode.preference = 'dark')

    return {
        colorMode, iconTheme, changeTheme
    }
}