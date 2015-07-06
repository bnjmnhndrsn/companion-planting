class PlantingsController < ApplicationController
  def show
    @planting = Planting.find(params[:id])
    if @planting
      render :show
    else
      render json: ["No garden!"], status: 404
    end
  end

  def create
    @planting = Planting.new(plantings_params)
    if @planting.save
      render :show
    else
      render json: @planting.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @planting = Planting.find(params[:id])
    if @planting.update(plantings_params)
      render :show
    else
      render json: @planting.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    def plantings_params
      parameters = params.permit(:id, :top, :bottom, :left, :right, :garden_id, plant: [:id])
      parameters[:plant_id] = parameters[:plant][:id] if parameters[:plant]
      parameters.delete(:plant)
      parameters
    end
end
