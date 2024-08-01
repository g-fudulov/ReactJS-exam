import { useReducer } from "react";

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD_VALUE":
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "SET_IS_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

function useForm(initialValues = {}, callback, validate) {
  const initialState = {
    values: initialValues,
    errors: {},
    isSubmitting: false,
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD_VALUE", field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate) {
      const validationErrors = validate(state.values);
      dispatch({ type: 'SET_ERRORS', errors: validationErrors });
      if (Object.keys(validationErrors).length === 0) {
        dispatch({ type: 'SET_IS_SUBMITTING', isSubmitting: true });
        await callback(state.values);
        dispatch({ type: 'SET_IS_SUBMITTING', isSubmitting: false });
      }
    } else {
      dispatch({ type: 'SET_IS_SUBMITTING', isSubmitting: true });
      await callback(state.values);
      dispatch({ type: 'SET_IS_SUBMITTING', isSubmitting: false });
    }
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return {
    handleChange,
    handleSubmit,
    resetForm,
    values: state.values,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
  };
}

export default useForm;
