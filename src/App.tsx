import { Authenticator, Button, Divider } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import Todo from "./Todo";

function App() {

  return (
    <Authenticator>
    {({ signOut, user }) => (
    <main>
      <p>{user?.signInDetails?.loginId}'s todos 
        <Button variation="link" onClick={signOut} size="small">Sign out</Button>
      </p>
      <Divider orientation="horizontal" />
      <Todo user={user} signOut={signOut}/>
    </main>
      )}
    </Authenticator>
  );
}

export default App;
