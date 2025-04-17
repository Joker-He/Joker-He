


import {ref} from 'vue'

const useBoolean = (initialValue: boolean): [boolean, (nextValue?: boolean) => void] => {
//   const [value, setValue] = useState<boolean>(initialValue);

    const flag = ref<any>(initialValue)

//   const toggle = useCallback((nextValue?: boolean) => {
//     if (typeof nextValue === 'boolean') setValue(nextValue);
//     else setValue(currentValue => !currentValue);
//   }, [setValue]);
    const toggle = (nextValue?: boolean)=>{
        if (typeof nextValue === 'boolean') flag.value = nextValue;
        else 
        flag.value = !flag.value;
    }

    return [flag, toggle];
};

export default useBoolean;
