import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()


# create category table
class SMS(Base):
    __tablename__ = 'sms'

    id = Column(Integer, primary_key=True)
    title = Column(String(400), nullable=False)
    level = Column(String(400), nullable=False)
    timestamp = Column(String(400), nullable=False)
    Long = Column(String(400))
    Lat = Column(String(400))

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'title': self.title,
            'id': self.id,
            'level': self.level,
            'Longitude' : self.Long,
            'Latidude' : self.Lat,
            'timestamp': self.timestamp,
            

        }


# create uset table
class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    phone = Column(String(250))




   


engine = create_engine('sqlite:///catalog.db')


Base.metadata.create_all(engine)