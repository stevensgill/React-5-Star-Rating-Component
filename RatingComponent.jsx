function RatingFeedbackPopover ({
  rating,
  feedback,
  handleStarClick,
  handleClearClick,
  handleFeedbackChange,
  handleStarHoverOver,
  handleStarHoverOut,
  submitRating,
  hasSaved
}) {
  const { ButtonToolbar, Button } = ReactBootstrap;
  const {
    label,
    feedback_placeholder: feedbackPlaceholder,
    buttons: {
      add_comment: addCommentLabel,
      clear_rating: clearRatingLabel,
      update_comment: updateCommentLabel
    }
  } = I18n.t('investigations.scores.popover');
  return (
    <div className="RatingFeedbackPopover">
      <RatingRating
        rating={rating}
        handleStarClick={handleStarClick}
        handleStarHoverOver={handleStarHoverOver}
        handleStarHoverOut={handleStarHoverOut}
      />
      <textarea
        className="RatingFeedbackPopover__feedback"
        name="feedback"
        defaultValue={feedback}
        placeholder={feedbackPlaceholder}
        onChange={(event) => handleFeedbackChange(event.target.value)}
      ></textarea>
      <ButtonToolbar>
        <Button
          disabled={_.isNull(rating)}
          className="RatingFeedbackPopover__addComment btn btn-default"
          onClick={submitRating}>{addCommentLabel}</Button>
        <a className="RatingFeedbackPopover__clearRating"
           href="#"
           onClick={handleClearClick}>{clearRatingLabel}</a>
      </ButtonToolbar>
    </div>
  );
};

RatingFeedbackPopover.propTypes = {
  rating: React.PropTypes.number,
  feedback: React.PropTypes.string,
  handleStarClick: React.PropTypes.func.isRequired,
  handleClearClick: React.PropTypes.func.isRequired,
  handleFeedbackChange: React.PropTypes.func.isRequired,
  handleStarHoverOver: React.PropTypes.func.isRequired,
  handleStarHoverOut: React.PropTypes.func.isRequired,
  submitRating: React.PropTypes.func.isRequired,
  hasSaved: React.PropTypes.bool.isRequired
};

RatingFeedbackPopover.defaultProps = {
  feedback: null,
};
