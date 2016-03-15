module Api
  class PinsController < ApplicationController
    def create

    end

    def update
      new_input = params[:input]
      puts params[:input]
      pin_id = params[:id]
      updatedpin = Pin.update(pin_id, {description: new_input})
      head :ok, content_type: "text/html"
    end

    def destroy

    end
  end
end