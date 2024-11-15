
import { useLocation } from 'react-router-dom';

export default function ErrorPage() {
  const location = useLocation();
  const error = (location.state as any)?.error;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.message || 'Unknown error'}</i>
      </p>
    </div>
  );
}
