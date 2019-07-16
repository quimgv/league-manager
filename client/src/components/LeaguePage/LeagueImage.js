import React from "react";
import { Image } from "semantic-ui-react";

import defaultImage from "../../assets/img/user/undefined.gif";

const LeagueImage = ({ league }) => {
  const { _id, image } = league;
  return (
    <Image
      src={image ? `/league/${_id}/image` : defaultImage}
      size="small"
      centered
    />
  );
};

export default LeagueImage;
