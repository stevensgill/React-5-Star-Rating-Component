function RatingStar ({
  selected = false,
  rating,
  handleStarClick,
  handleStarHoverOver,
  handleStarHoverOut
}) {
  let starClasses = 'RatingRating__star fa fa-star';
  if (selected) {
    starClasses += ' selected';
  }
  return (
    <i className={starClasses}
       onClick={() => handleStarClick(rating)}
       onMouseOver={() => handleStarHoverOver(rating)}
       onMouseOut={() => handleStarHoverOut()}
    />
  );
};

RatingStar.propTypes = {
  rating: React.PropTypes.number,
  handleStarClick: React.PropTypes.func.isRequired,
  handleStarHoverOver: React.PropTypes.func.isRequired,
  handleStarHoverOut: React.PropTypes.func.isRequired
};

RatingStar.defaultProps = {
  rating: 0,
};


function RatingComponent ({
  rating = 0,
  handleStarClick,
  handleStarHoverOver,
  handleStarHoverOut
}) {
  const { header_label: headerLabel } = I18n.t('investigations.scores');
  let stars = [];
  for(let i = 0 ; i < 5; i++){
    const selected = (i < rating);
    stars.push(
      <RatingStar
        key={i}
        selected={selected}
        rating={i + 1}
        handleStarClick={handleStarClick}
        handleStarHoverOver={handleStarHoverOver}
        handleStarHoverOut={handleStarHoverOut}
      />
    );
  }

  return (
    <div className="RatingComponent">
      <label className="RatingComponent__label">{headerLabel}</label>
      {stars}
    </div>
  );
};

RatingComponent.propTypes = {
  rating: React.PropTypes.number,
  handleStarClick: React.PropTypes.func.isRequired,
  handleStarHoverOver: React.PropTypes.func.isRequired,
  handleStarHoverOut: React.PropTypes.func.isRequired
};

RatingComponent.defaultProps = {
};
