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
    case "SET_VALUES":
      return {
        ...state,
        values: { // values: action.values
          ...state.values,
          ...action.values,
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
      return {
        values: action.initialValues,
        errors: {},
        isSubmitting: false,
      };
    case "RESET_ERRORS":
      return {
        ...state,
        errors: {},
      };
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
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    dispatch({ type: "SET_FIELD_VALUE", field: name, value: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate) {
      dispatch({ type: "RESET_ERRORS" });
      const validationErrors = validate(state.values);
      dispatch({ type: "SET_ERRORS", errors: validationErrors });
      if (Object.keys(validationErrors).length === 0) {
        dispatch({ type: "SET_IS_SUBMITTING", isSubmitting: true });
        await callback(state.values);
        dispatch({ type: "SET_IS_SUBMITTING", isSubmitting: false });
      }
    } else {
      dispatch({ type: "SET_IS_SUBMITTING", isSubmitting: true });
      await callback(state.values);
      dispatch({ type: "SET_IS_SUBMITTING", isSubmitting: false });
    }
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM", initialValues });
  };

  const setValues = (values) => {
    dispatch({ type: "SET_VALUES", values });
  };

  return {
    handleChange,
    handleSubmit,
    resetForm,
    values: state.values,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
    setValues,
  };
}

export default useForm;
