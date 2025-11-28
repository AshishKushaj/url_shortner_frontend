import { useNavigate } from "react-router-dom";

export default function LinkRow({ link, onDelete }) {

    const navigate = useNavigate();

    const clicks = link.viewed.length;

    const last =
        link.viewed.length > 0
            ? new Date(link.viewed[link.viewed.length - 1]).toLocaleString()
            : "Never";

    return (
        <tr>
            <td>
                <button
                    className="link-button"
                    onClick={() => navigate(`/code/${link.shortUrl}`)}
                >
                    {link.shortUrl}
                </button>
            </td>

            <td className="table-url-cell">

                <a href={link.url} target="_blank" rel="noreferrer">
                    {link.url}
                </a>

            </td>

            <td>{clicks}</td>
            <td>{last}</td>

            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(link.shortUrl)}
                >
                    Delete
                </button>
                
            </td>
        </tr>
    );
}
