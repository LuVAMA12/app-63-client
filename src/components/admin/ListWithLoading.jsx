const ListWithLoading = ({ loading, items, emptyMessage, renderItem }) => {
  if (loading) {
    return (
      <article className="loading-container">
        <div className="loader"></div>
      </article>
    );
  }

  if (!items || items.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return <>{items.map(renderItem)}</>;
}
 export default ListWithLoading