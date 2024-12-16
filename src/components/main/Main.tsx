import "./main.css";
import Search from "../../pages/find-one/Find-one";
import CreateArticle from "../../pages/create/Create";
import DeleteOne from "../../pages/delete/Delete-one";
import Update from "../../pages/update/Update";
export function Main({ view }: { view: string }) {
  return (
    <div className="main-ctn">
      {view === "create" && <CreateArticle />}
      {view === "update" && <Update />}
      {view === "delete" && <DeleteOne />}
      {view === "search" && <Search />}
      {view === "home" && <p className="title-main">Bienvenido a la aplicación</p>}
    </div>
  );
}
