# use-validation

### Motivation

Managing error message and error handling can become tedious sometimes. `use-validation` provides a straightforward API to get rid of those repetitive works.

### Examples

without use-validation

```jsx
function RegisterForm() {
  const [password, setPassword] = useState('')
  let errMsg = '';

  if (isNotEmpty(password)) {
    errMsg = 'Your password must not be empty!';
  } else if (containsLowercase(password)) {
    errMsg = 'Your password must contain at least one lowercase letter!';
  } else if (containsUppercase(password)) {
    errMsg = 'Your password must contain at least one uppercase letter!';
  } else if (containsNumber(password)) {
    errMsg = 'Your password must contain at least one number!';
  } else if (isLongerThan12(password)) {
    errMsg = 'Your password must be at least 12 characters in length!';
  }
  return (
    <form>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}>
      <div>{errMsg}</div>
    </form>
  );
}
```

without use-validation

```jsx
import useValidation from 'use-validation';

function RegisterForm() {
  const [password, setPassword] = useState('')
  const { errMsg } = useValidation(password, [
    { validateFn: isNotEmpty, errMsg: 'Your password must not be empty!' },
    { validateFn: containsLowercase, errMsg: 'Your password must contain at least one lowercase letter!' },
    { validateFn: containsUppercase, errMsg: 'Your password must contain at least one uppercase letter!' },
    { validateFn: containsNumber, errMsg: 'Your password must contain at least one number!' },
    { validateFn: isLongerThan12, errMsg: 'Your password must be at least 12 characters in length!' },
    ]);

  return (
    <form>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)}>
      <div>{errMsg}</div>
    </form>
  );
}
```
