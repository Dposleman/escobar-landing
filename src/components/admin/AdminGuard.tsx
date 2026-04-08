import { useAuth } from "../../hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export function AdminGuard({ children }: Props) {
  const { user, isAdmin, login } = useAuth();

  if (!user || !isAdmin) {
    return (
      <div className="admin-login">
        <h2>ADMIN ACCESS</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            login(
              String(form.get("email")),
              String(form.get("password"))
            );
          }}
        >
          <input name="email" placeholder="email" />
          <input name="password" type="password" placeholder="password" />
          <button type="submit">ENTER</button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}