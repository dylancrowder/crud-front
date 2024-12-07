import { Button, Stack } from "react-bootstrap";
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

      <Stack gap={3}>
        {actions.map((action) => (
          <Button
            key={action.view}
            className="p-2"
            variant="primary"
            onClick={() => onViewChange(action.view)}
          >
            {action.label}
          </Button>
        ))}
      </Stack>

    </div>
  );
}
