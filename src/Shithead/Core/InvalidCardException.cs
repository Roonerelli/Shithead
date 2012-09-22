using System;

namespace Shithead.Core
{
    public class InvalidCardException : System.Exception
    {
        public InvalidCardException()
        {}

        public InvalidCardException(string message) : base(message)
        {}

        public InvalidCardException(string message, Exception innerException) : base(message, innerException)
        {}

    }
}
