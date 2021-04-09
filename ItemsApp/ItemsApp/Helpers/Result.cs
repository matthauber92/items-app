using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ItemsApp.Helpers
{
    public class Result
    {
        public Result()
        {
        }

        public Result(Result result)
        {
            this.Exception = result.Exception;
        }

        public Exception Exception { get; set; }
        public bool HasError
        {
            get
            {
                if (Exception != null)
                    return true;

                return false;
            }
        }
    }

    [Serializable]
    public class Result<T> : Result
    {
        public Result()
            : base()
        {
        }

        public bool HasValue
        {
            get
            {
                if (HasError)
                    return false;

                if (Value != null && Value is string)
                {
                    string stringvalue = (string)(object)Value;
                    stringvalue.Trim();
                    return stringvalue.Length > 0;
                }
                else if (Value is ICollection)
                {
                    return ((ICollection)Value).Count > 0;
                }
                else if (typeof(T).IsArray)
                {
                    Array a = (Array)(object)Value;
                    return a.Length > 0;
                }

                return Value != null;
            }
        }

        public Result(Result result)
            : base(result)
        {
        }

        public T Value { get; set; }
    }
}
