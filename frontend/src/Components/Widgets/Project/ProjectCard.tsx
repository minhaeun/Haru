import React from 'react';
import { Badge } from 'react-bootstrap';
import { getFaviconSrc } from '../../../Utils';
import { project } from '../../../Utils/Project';

type projectCardProps = {
  item: project;
  handleShowMore: (id: number) => void;
};

const ProjectCard = (props: projectCardProps) => {
  const { item, handleShowMore } = props;
  return (
    <div
      className="w-30 h-100 p-2"
      onClick={() => handleShowMore(item.id)}
      key={item.id}>
      <div className="p-2 h-100 pjt-card">
        <div className="col d-flex justify-content-center h-50">
          <img src={item.imageInfo.imageUrl} className="w-80" />
        </div>
        <div className="d-flex flex-column justify-content-around">
          <p className="col my-0 fw-bold mt-2 fs-sm nowrap">{item.title}</p>
          <div className="col nowrap">
            {item.projectLabels.length > 2 && (
              <div>
                {item.projectLabels.slice(0, 2).map((projectLabel, idx) => (
                  <Badge
                    pill
                    key={idx}
                    bg="warning"
                    style={{ fontSize: '0.5rem', marginRight: '0.1rem' }}>
                    {projectLabel.name}
                  </Badge>
                ))}
                <span className="fw-bold" style={{ fontSize: '0.5rem' }}>
                  + {item.projectLabels.length - 2}
                </span>
              </div>
            )}
            {item.projectLabels.length <= 2 && (
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {item.projectLabels.map((projectLabel, idx) => (
                  <Badge
                    pill
                    key={idx}
                    bg="warning"
                    style={{ fontSize: '0.5rem', marginRight: '0.1rem' }}>
                    {projectLabel.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div
            className="col d-flex justify-content-end"
            style={{ height: '5%', right: '1rem', bottom: '1rem' }}>
            {item.projectLinks.map((projectLink, idx) => (
              <a
                href={projectLink.url}
                key={idx}
                style={{ marginRight: '0.3rem' }}>
                <img
                  width="18"
                  height="18"
                  src={getFaviconSrc(projectLink.url)}
                  alt={projectLink.name}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
