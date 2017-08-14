class RatingComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      id: null,
      rating: null,
      feedback: null,
      savedRating: null,
      savedFeedback: null,
      hoveredRating: null,
      investigationUuid: null,
      organizationId: null,
      showFeedbackPopover: false,
      showRatingComponent: false
    }

    this._retrieveRating = this._retrieveRating.bind(this);
    this._handleStarClick = this._handleStarClick.bind(this);
    this._handleClearClick = this._handleClearClick.bind(this);
    this._handleStarHoverOver = this._handleStarHoverOver.bind(this);
    this._handleStarHoverOut = this._handleStarHoverOut.bind(this);
    this._showPopover = this._showPopover.bind(this);
    this._handleFeedbackChange = this._handleFeedbackChange.bind(this);
    this._submitRating = this._submitRating.bind(this);

  }

  componentWillMount() {
    const { investigationUuid, organizationId } = this.props;
    this.setState({
      investigationUuid,
      organizationId
    });
    this._retrieveRating(investigationUuid);
  }

  _retrieveRating(investigationUuid) {
    const url = encodeURI(`/scores/${investigationUuid}`);
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8'
    }).done((json) => {
      const {
        id,
        rating,
        feedback,
        organization_id: organizationId,
        investigation_uuid: investigationUuid,
        status
      } = json;
      this.setState({
        id,
        rating,
        feedback,
        savedRating: rating,
        savedFeedback: feedback,
        investigationUuid,
        organizationId,
        showRatingComponent: !_.isEqual(status, 'unauthorized') // EPIC TOGGLE
      });
    }).fail((data) => {
      this.setState({ showRatingComponent: true });
    });  }

  _RatingJson() {
    const {
      id,
      rating,
      feedback,
      investigationUuid: investigation_uuid,
      organizationId: organization_id
    } = this.state;
    return {
      id,
      rating,
      feedback,
      investigation_uuid,
      organization_id
    }
  }

  _submitRating() {
    const { id, investigationUuid } = this.state;
    let url = encodeURI('/scores');
    let type = 'POST';
    if (!_.isNull(id)) {
      url = encodeURI(`/scores/${id}`);
      type = 'PUT';
    }
    const json = this._RatingJson();
    $.ajax({
      url: url,
      type: type,
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(json),
    }).done((json) => {
      const {
        id,
        rating,
        feedback,
        investigation_uuid,
        organization_id
      } = json
      this.setState({
        id,
        rating,
        feedback,
        savedRating: rating,
        savedFeedback: feedback,
        investigationUuid: investigation_uuid,
        organizationId: organization_id,
        showFeedbackPopover: false
      });
    });
  }

  _handleStarClick(rating) {
    this.setState({
      rating,
      showFeedbackPopover: true
    });
  }

  _handleStarHoverOver(hoveredRating) {
    this.setState({ hoveredRating });
  }

  _handleStarHoverOut() {
    this.setState({ hoveredRating: null });
  }

  _showPopover() {
    this.setState({
      showFeedbackPopover: true
    });
  }

  _handleClearClick() {
    const { id, savedRating, savedFeedback } = this.state;
    this.setState({
      rating: _.isNull(id) ? null: savedRating,
      feedback: _.isNull(id) ? null : savedFeedback,
      showFeedbackPopover: false
    });
  }

  _handleFeedbackChange(feedback) {
    this.setState({ feedback });
  }

  render() {
    const {
      id,
      rating,
      feedback,
      savedRating,
      savedFeedback,
      hoveredRating,
      investigationUuid,
      organizationId,
      showFeedbackPopover,
      showRatingComponent
    } = this.state;
    const { Overlay } = ReactBootstrap;
    const savedRatingValue = _.isNull(hoveredRating) ? savedRating : hoveredRating;
    const ratingValue = _.isNull(hoveredRating) ? rating : hoveredRating;
    const hasSaved = !_.isNull(savedRating)
    const componentClass = showFeedbackPopover ? "RatingComponent--showPopover" : "RatingComponent";
    return (
      <div>
        { showRatingComponent ?
          <div className={componentClass}>
            <div className="RatingRating__header">
              <RatingRating
                rating={savedRatingValue}
                handleStarClick={this._handleStarClick}
                handleStarHoverOver={this._handleStarHoverOver}
                handleStarHoverOut={this._handleStarHoverOut}
              />
            </div>
            {showFeedbackPopover ?
              <RatingFeedbackPopover
                feedback={feedback}
                rating={ratingValue}
                hasSaved={hasSaved}
                handleStarClick={this._handleStarClick}
                handleClearClick={this._handleClearClick}
                handleFeedbackChange={this._handleFeedbackChange}
                handleStarHoverOver={this._handleStarHoverOver}
                handleStarHoverOut={this._handleStarHoverOut}
                submitRating={this._submitRating}
              />
              : null }
          </div>
        : null }
      </div>
    );
  }
}

RatingComponent.propTypes = {
  investigationUuid: React.PropTypes.string.isRequired,
  organizationId: React.PropTypes.number.isRequired
};
