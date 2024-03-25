from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Observation, ObservationCreate, ObservationOut, ObservationsOut, ObservationUpdate, Message

router = APIRouter()


@router.get("/", response_model=ObservationsOut)
def read_observations(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve items.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(Observation)
        count = session.exec(count_statement).one()
        statement = select(Observation).offset(skip).limit(limit)
        observations = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(Observation)
            .where(Observation.owner_id == current_user.id)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(Observation)
            .where(Observation.owner_id == current_user.id)
            .offset(skip)
            .limit(limit)
        )
        observations = session.exec(statement).all()

    return ObservationsOut(data=observations, count=count)


@router.get("/{id}", response_model=ObservationOut)
def read_observation(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    """
    Get observation by ID.
    """
    observation = session.get(Observation, id)
    if not observation:
        raise HTTPException(status_code=404, detail="Observation not found")
    if not current_user.is_superuser and (observation.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return observation


@router.post("/", response_model=ObservationOut)
def create_observation(
    *, session: SessionDep, current_user: CurrentUser, observation_in: ObservationCreate
) -> Any:
    """
    Create new observation.
    """
    observation = Observation.model_validate(observation_in, update={"owner_id": current_user.id})
    session.add(observation)
    session.commit()
    session.refresh(observation)
    return observation


@router.put("/{id}", response_model=ObservationOut)
def update_observation(
    *, session: SessionDep, current_user: CurrentUser, id: int, observation_in: ObservationUpdate
) -> Any:
    """
    Update an observation.
    """
    observation = session.get(Observation, id)
    if not observation:
        raise HTTPException(status_code=404, detail="Observation not found")
    if not current_user.is_superuser and (observation.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = observation_in.model_dump(exclude_unset=True)
    observation.sqlmodel_update(update_dict)
    session.add(observation)
    session.commit()
    session.refresh(observation)
    return observation


@router.delete("/{id}")
def delete_observation(session: SessionDep, current_user: CurrentUser, id: int) -> Message:
    """
    Delete an observation.
    """
    observation = session.get(Observation, id)
    if not observation:
        raise HTTPException(status_code=404, detail="Item not found")
    if not current_user.is_superuser and (observation.owner_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(observation)
    session.commit()
    return Message(message="Observation deleted successfully")
