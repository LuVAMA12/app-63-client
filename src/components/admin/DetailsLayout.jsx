import { useState } from "react";

const DetailsLayout = ({
  loading,
  isEditing,
  setIsEditing,
  onToggleEdit,
  FormComponent,
  onDelete,
  children,
  mainId,
  data,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };

  return (
    <main id={mainId} className="admin-main">
      {loading && (
        <article className="loading-container">
          <div className="loader"></div>
        </article>
      )}
      {!loading && data && !isEditing && (
        <section className="details-card">
          {children}

          {!confirmDelete && (
            <div className="actions-btn">
              <button className="edit" onClick={onToggleEdit}>
                Modifier
              </button>
              <button className="delete" onClick={handleConfirmDelete}>
                Supprimer
              </button>
            </div>
          )}
          {confirmDelete && (
            <div>
              <p>Etes vous sure de vouloir supprimer ?</p>
              <div className="actions-btn">
                <button className="confirm" onClick={onDelete}>
                  Valider
                </button>
                <button
                  className="delete"
                  onClick={() => setConfirmDelete(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {!loading && data && isEditing && FormComponent && (
        <FormComponent
          data={data}
          onCancel={onToggleEdit}
          setIsEditing={setIsEditing}
        />
      )}
    </main>
  );
};

export default DetailsLayout;
