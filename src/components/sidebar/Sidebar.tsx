import "./sidebar.css";

export function Sidebar({
  onViewChange,
}: {
  onViewChange: (view: string) => void;
}) {
  const actions = [
    { label: "Crear", view: "create" },
    { label: "Actualizar", view: "update" },
    { label: "Borrar", view: "delete" },
    { label: "Buscar", view: "search" },
  ];

  return (
    <div className="sidebar-cnt">
      {actions.map((action) => (
        <button
          key={action.view}
          className="btn"
          onClick={() => onViewChange(action.view)}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
