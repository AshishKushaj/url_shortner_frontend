import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div className="app">
            <header className="header">
                
                <h1 className="title">TinyLink</h1>

                <nav className="nav">
                   
                    <NavLink to="/" end className="nav-link">
                        Dashboard
                    </NavLink>
                    <NavLink to="/healthz" className="nav-link">
                        Health
                    </NavLink>
                </nav>
            </header>

            <main className="main">{children}</main>

            <footer className="footer">
                TinyLink · {new Date().getFullYear()}
            </footer>
        </div>
    );
}
