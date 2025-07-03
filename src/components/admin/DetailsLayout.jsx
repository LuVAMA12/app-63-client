const DetailsLayout = ({
  loading,
  isEditing,
  onToggleEdit,
  FormComponent,
  onDelete,
  children,
  mainId,
  data,
}) => {

  return (

      <main id={mainId} className="admin-main">
        {loading && (
        <article className="loading-container">
          <div className="loader"></div>
        </article>
      )}
    {!loading && data && !isEditing &&  
            <section className="details-card">
            {children}
            
            <div className="actions-btn">
            <button className="edit" onClick={onToggleEdit}>
            Modifier
            </button>
            <button className="delete" onClick={onDelete}>
            Supprimer
            </button>
            </div>
            </section>
    
        }
            
            
            {!loading && data && isEditing && FormComponent &&
                < FormComponent data={data} onCancel={onToggleEdit} />
        }
    </main>
);
};

export default DetailsLayout;
