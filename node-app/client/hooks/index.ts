import {
	useState,
	useEffect,
	SetStateAction,
	Dispatch,
	DispatchWithoutAction,
} from "react";

export function useLocalStorage(key: string, initialValue: any) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = (window as any).localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const setValue = (value: any) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			(window as any).localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	};

	return [storedValue, setValue];
}

export function useThemeSwitch(defaultState: boolean | false) {
	const [theme, setTheme] = useLocalStorage("dark-mode", defaultState);

	const switchTheme = () => {
		setTheme(!theme);
	};

	useEffect(() => {
		if (theme) {
			document.body.className = " theme-dark bg-background";
		} else {
			document.body.className = " bg-background";
		}
	}, [theme]);

	return [theme, switchTheme];
}

export function useDropToggleState(
	defaultState: boolean = false
): [boolean, DispatchWithoutAction] {
	const [state, setState] = useState<boolean>(defaultState);

	const updateState = () => {
		setState(!state);
	};
	return [state, updateState];
}
